namespace PressStart2.Domain.Commands.UserLogin
{
    public class UserLoginResponse
    {
        public UserLoginResponse(Guid id, string name)
        {
            Id = id;
            Name = name;
        }

        public Guid Id { get; }
        public string Name { get; }

    }
}
