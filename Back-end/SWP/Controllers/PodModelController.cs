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
    public class PodModelController : ControllerBase
    {
        private readonly IPodModelRepository _podModelRepo;
        private readonly IMapper _mapper;

        public PodModelController(IPodModelRepository podModelRepo, IMapper mapper)
        {
            _podModelRepo = podModelRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLocation()
        {
            try
            {
                var models = await _podModelRepo.GetAllAsync();
                return Ok(models);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
        {
            var loc = await _podModelRepo.GetByIdAsync(id);
            if (loc == null)
            {
                return BadRequest();
            }
            return Ok(loc);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var locModel = await _podModelRepo.DeleteAsync(id);
            if (locModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RequestPodModelDto podDto)
        {
            var pmodel = _mapper.Map<PodModel>(podDto);
            var podModel = await _podModelRepo.CreateAsync(pmodel);
            return Ok(podModel);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] RequestPodModelDto pmt)
        {
            var podModel = await _podModelRepo.UpdateAsync(id, pmt);
            if (podModel == null)
            {
                return BadRequest();
            }
            return Ok(podModel);
        }
    }
}
