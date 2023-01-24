using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : BaseEntity
    {
        protected readonly DbSet<TEntity> DbSet;
        protected readonly PressStart2Context _context;

        public RepositoryBase(PressStart2Context context)
        {
            DbSet = context.Set<TEntity>();
            _context = context;
        }

        public void Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public void Commit()
        {
            _context.SaveChanges();
        } 

        public void Delete(TEntity entity)
        {
            DbSet.Remove(entity);
        }

        public TEntity Get(Guid id)
        {
            return DbSet.Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return DbSet.AsEnumerable();
        }

        public IQueryable<TEntity> Query()
        {
            return DbSet.AsQueryable();
        }

        public void Update(TEntity entity)
        {
            DbSet.Update(entity);
        }
    }
}
