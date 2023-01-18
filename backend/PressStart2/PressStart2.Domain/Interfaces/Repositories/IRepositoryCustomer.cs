using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositoryCustomer : IRepositoryBase<Customer>
    {
        bool AlreadyExistsCPF(string cpf, Guid customerId);
        bool AlreadyExistsCPF(string cpf);
    }
}
