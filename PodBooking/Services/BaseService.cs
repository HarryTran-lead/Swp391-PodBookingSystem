using Microsoft.EntityFrameworkCore;
using PodBooking.Models;

namespace PodBooking.Services
{
    public class BaseService <T>
    {
        protected readonly BaseService<T> _baseService;

        public BaseService(BaseService<T> baseService)
        {
            _baseService = baseService;
        }
    }
}
