using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositoryUser : IRepositoryBase<User>
    {
        User Authenticate(string login, string password);
    }
}
