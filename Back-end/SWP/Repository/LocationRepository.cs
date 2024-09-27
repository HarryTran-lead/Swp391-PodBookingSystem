using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SWP.Data;
using SWP.Dto.Fercility;
using SWP.Interfaces;
using SWP.Model;

namespace SWP.Repository
{
    public class LocationRepository : ILocationRepository
    {
        private readonly AppDBContext _context;
       

        public LocationRepository(AppDBContext context)
        {
            _context = context;
          
        }
        public async Task<Location> CreateAsync(Location loc)
        {
             await _context.Locations.AddAsync(loc);
             await _context.SaveChangesAsync();
            return loc;
        }

        public async Task<Location> DeleteAsync(int id)
        {
            var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);
            if (locationModel ==null)
            {
                return null;
            }
            _context.Locations.Remove(locationModel);
            await _context.SaveChangesAsync();
            return locationModel; 
        }

        public Task<List<Location>> GetAllAsync()
        {
            return _context.Locations.ToListAsync();
        }

        public async Task<Location?> GetByIdAsync(int id)
        {
            return await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> LocationExists(int id)
        {
            return await _context.Locations.AnyAsync();
        }

        public async Task<Location> UpdateAsync(int id, RequestLocationDto locationDto)
        {
            var location = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);
            if(location == null)
            {
                return null;
            }
            location.Name = locationDto.Name;
            location.Address = locationDto.Address;
            await _context.SaveChangesAsync();
            return location;
        }
    }
}
