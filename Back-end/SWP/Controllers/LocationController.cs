using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP.Dto.Fercility;
using SWP.Interfaces;
using SWP.Model;

namespace SWP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locRepo;
        private readonly IMapper _mapper;

        public LocationController(ILocationRepository locRepo,IMapper mapper)
        {
            _locRepo = locRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLocation()
        {
            try
            {
                var locs = await _locRepo.GetAllAsync();
                return Ok(locs);
            }
            catch 
            { 
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
        { 
            var loc = await _locRepo.GetByIdAsync(id);
            if (loc == null) { 
                return BadRequest();
            }
            return Ok(loc);
            
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        { 
            var locModel = await _locRepo.DeleteAsync(id);
            if (locModel == null) { 
                return NotFound();
            }
            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RequestLocationDto locationDto)
        {
            var locationModel = _mapper.Map<Location>(locationDto);
            var location = await _locRepo.CreateAsync(locationModel);
            return Ok(location);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] RequestLocationDto loc)
        {
            var location = await _locRepo.UpdateAsync(id, loc);
            if (location == null)
            {
                return BadRequest();
            }
            return Ok(location);
        }
    }
}
