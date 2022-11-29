namespace PressStart2.Domain.Commands.GetCustomer
{
    public class GetCustomerResponse
    {
        public GetCustomerResponse(Guid id, string name, string email, string phone, string cpf, bool isActive)
        {
            Id = id;
            Name = name;
            Email = email;
            Phone = phone;
            Cpf = cpf;
            IsActive = isActive;
        }

        public Guid Id { get; set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Phone { get; private set; }
        public string Cpf { get; private set; }
        public bool IsActive { get; private set; }
    }
}
