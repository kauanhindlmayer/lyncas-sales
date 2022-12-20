using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Login { get; private set; }
        public string Name { get; private set; }
        public string Password { get; private set; }

        protected User() { }

        public User(string login, string name, string password)
        {
            Login = login;
            Name = name;
            Password = password;

            this.AddUserContract();
        }
    }
}
