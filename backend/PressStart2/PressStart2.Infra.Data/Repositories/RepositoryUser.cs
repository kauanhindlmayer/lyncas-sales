using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryUser : RepositoryBase<User>, IRepositoryUser
    {
        public RepositoryUser(PressStart2Context context) : base(context)
        {

        }

        public User Authenticate(string login, string password)
        {
            return DbSet.FirstOrDefault(p => p.Login == login && p.Password == password);
        }
    }
}
