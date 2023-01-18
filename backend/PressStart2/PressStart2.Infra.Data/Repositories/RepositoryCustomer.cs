using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryCustomer : RepositoryBase<Customer>, IRepositoryCustomer
    {
        public RepositoryCustomer(PressStart2Context context) : base(context)
        {
            
        }

        public bool AlreadyExistsCPF(string cpf, Guid customerId)
        {
            return _context.CustomerDbSet.Any(p => p.Cpf == cpf && p.Id != customerId);
        }

        public bool AlreadyExistsCPF(string cpf)
        {
            return _context.CustomerDbSet.Any(p => p.Cpf == cpf);
        }
    }
}
 