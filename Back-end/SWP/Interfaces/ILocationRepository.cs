using SWP.Dto.Fercility;
using SWP.Model;

namespace SWP.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllAsync();
        Task<Location?> GetByIdAsync(int id);
        Task<Location> CreateAsync(Location loc);
        Task<Location> UpdateAsync(int id, RequestLocationDto loc);
        Task<Location> DeleteAsync(int id);
        Task<bool> LocationExists(int id);
    }
}
