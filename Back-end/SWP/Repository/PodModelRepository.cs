using Microsoft.EntityFrameworkCore;
using SWP.Data;
using SWP.Dto.Fercility;
using SWP.Interfaces;
using SWP.Model;

namespace SWP.Repository
{
    public class PodModelRepository : IPodModelRepository
    {
        private readonly AppDBContext _context;

        public PodModelRepository(AppDBContext context)
        {
            _context = context;
        }


        public async Task<PodModel> DeleteAsync(int id)
        {
            var model = _context.PodModels.FirstOrDefault(x => x.Id == id);
            if (model == null) {
                return null;
            }
            _context.PodModels.Remove(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public Task<List<PodModel>> GetAllAsync()
        {
            return _context.PodModels.ToListAsync();
        }

        public async Task<PodModel> GetByIdAsync(int id)
        {
            return await _context.PodModels.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> StockExists(int id)
        {
            return await _context.PodModels.AnyAsync(x => x.Id == id);
        }

        public async Task<PodModel> UpdateAsync(int id, RequestPodModelDto podModelDto)
        {
            var model = await _context.PodModels.FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return null;
            }
            model.Name = podModelDto.Name;
            model.capacity = podModelDto.capacity;
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<PodModel> CreateAsync(PodModel pod)
        {
            await _context.PodModels.AddAsync(pod);
            await _context.SaveChangesAsync();
            return pod;
        }

        
    }
}
