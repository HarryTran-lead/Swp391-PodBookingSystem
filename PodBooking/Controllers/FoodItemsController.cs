using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodBooking.Models;
using PodBooking.DTOs;

namespace PodBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemsController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public FoodItemsController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/FoodItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodItemDTO>>> GetFoodItems()
        {
            var foodItems = await _context.FoodItems.ToListAsync();

            // Map food items to DTOs including the image URL
            var foodItemDtos = foodItems.Select(foodItem => new FoodItemDTO
            {
                FoodId = foodItem.FoodId,
                FoodName = foodItem.FoodName,
                Description = foodItem.Description,
                Price = foodItem.Price,
                IsAvailable = foodItem.IsAvailable ?? true,
                ImageUrl = Url.Action(nameof(GetFoodItemImage), new { id = foodItem.FoodId }) // Generate URL for the image
            });

            return Ok(foodItemDtos);
        }

        // GET: api/FoodItems/{id}/image
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetFoodItemImage(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null || foodItem.ImgPod == null)
            {
                return NotFound("Food item or image not found.");
            }

            // Return the image data as a file
            return File(foodItem.ImgPod, "image/jpeg"); // Use "image/jpeg" or appropriate content type
        }

        // GET: api/FoodItems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodItem>> GetFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null)
            {
                return NotFound("Food item not found.");
            }

            return foodItem;
        }

        // PUT: api/FoodItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodItem(int id, [FromForm] FoodItem foodItem, IFormFile imageFile = null)
        {
            if (id != foodItem.FoodId)
            {
                return BadRequest("Food item ID mismatch.");
            }

            // If an image file is provided, read it into a byte array
            if (imageFile != null && imageFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(memoryStream);
                    foodItem.ImgPod = memoryStream.ToArray(); // Update the image
                }
            }

            _context.Entry(foodItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodItemExists(id))
                {
                    return NotFound("Food item not found.");
                }
                else
                {
                    throw; // Rethrow the exception for further handling
                }
            }

            return NoContent();
        }

        // POST: api/FoodItems
        [HttpPost]
        public async Task<ActionResult<FoodItem>> PostFoodItem([FromForm] FoodItem foodItem, IFormFile imageFile)
        {
            // Check if the image file is being uploaded
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            // Read the image file into a byte array
            using (var memoryStream = new MemoryStream())
            {
                await imageFile.CopyToAsync(memoryStream);
                foodItem.ImgPod = memoryStream.ToArray(); // Store the image as byte array in the model
            }

            _context.FoodItems.Add(foodItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFoodItem", new { id = foodItem.FoodId }, foodItem);
        }

        // DELETE: api/FoodItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem == null)
            {
                return NotFound("Food item not found.");
            }

            _context.FoodItems.Remove(foodItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FoodItemExists(int id)
        {
            return _context.FoodItems.Any(e => e.FoodId == id);
        }
    }
}
