using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositorySale : IRepositoryBase<Sale>
    {
        IQueryable<Sale> GetAllWithDependency();
        Sale GetWithDependency(Guid id);
        bool CustomerHasSales(Guid customerId);
    }
}