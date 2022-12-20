namespace PressStart2.Domain.Commands.CreateUser
{
    public class CreateUserResponse
    {
        public CreateUserResponse(Guid id, string message)
        {
            Id = id;
            Message = message;
        }

        public Guid Id { get; set; }
        public string Message { get; set; }

    }
}
