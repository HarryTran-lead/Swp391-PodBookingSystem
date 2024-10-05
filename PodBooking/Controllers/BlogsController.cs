using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodBooking.Models;
using PodBooking.DTOs; // Ensure this namespace is included

namespace PodBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public BlogsController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDTO>>> GetBlogs()
        {
            var blogs = await _context.Blogs.ToListAsync();

            // Map blogs to DTOs including image URL
            var blogDtos = blogs.Select(blog => new BlogDTO
            {
                Id = blog.Id,
                AdminId = blog.AdminId,
                ShortDes = blog.ShortDes,
                MainDes = blog.MainDes,
                Title = blog.Title,
                Img = Url.Action(nameof(GetBlogImage), new { id = blog.Id }) // Generate URL for the image
            });

            return Ok(blogDtos);
        }

        // GET: api/Blogs/{id}/image
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetBlogImage(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null || blog.Img == null)
            {
                return NotFound();
            }

            // Return the image data as a file
            return File(blog.Img, "image/jpeg"); // Use "image/jpeg" for JPG images
        }

        // GET: api/Blogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        // PUT: api/Blogs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlog(int id, Blog blog)
        {
            if (id != blog.Id)
            {
                return BadRequest();
            }

            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
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

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogExists(int id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }
    }
}
