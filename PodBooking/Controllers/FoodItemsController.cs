using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                return NotFound();
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
                return NotFound();
            }

            return foodItem;
        }

        // PUT: api/FoodItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodItem(int id, FoodItem foodItem)
        {
            if (id != foodItem.FoodId)
            {
                return BadRequest();
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FoodItems
        [HttpPost]
        public async Task<ActionResult<FoodItem>> PostFoodItem(FoodItem foodItem)
        {
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
                return NotFound();
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
