using SWP.Dto.Fercility;
using SWP.Model;

namespace SWP.Interfaces
{
    public interface IPodModelRepository
    {
        Task<List<PodModel>> GetAllAsync();
        Task<PodModel> GetByIdAsync(int id);
        Task<PodModel> CreateAsync(PodModel pod);
        Task<PodModel> UpdateAsync(int id, RequestPodModelDto podModelDto);
        Task<PodModel> DeleteAsync(int id);
        Task<bool> StockExists(int id);
    }
}
