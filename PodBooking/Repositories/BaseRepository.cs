using Microsoft.EntityFrameworkCore;
using PodBooking.Models;
using PodBooking.Repositories.IRepositories;
using System.Linq.Expressions;

namespace PodBooking.Repositories
{
    public class BaseRepository <T> : IBaseRepository<T> where T : class
    {
        protected readonly PodBookingContext _context;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(PodBookingContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        // Get all entities
        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        // Get entity by id
        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        // Find entities with condition
        public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        // Add a new entity
        public virtual async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        // Update an existing entity
        public virtual async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        // Delete an entity by id
        public virtual async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // Delete an entity by instance
        public virtual async Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
