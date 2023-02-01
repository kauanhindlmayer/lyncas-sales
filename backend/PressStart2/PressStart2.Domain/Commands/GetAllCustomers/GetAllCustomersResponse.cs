namespace PressStart2.Domain.Commands.GetAllCustomers
{
    public class GetAllCustomersResponse
    {
 
        public int RecordsQuantity { get; }
        public List<GetAllCustomersDetailsResponse> Customers { get; }

        public GetAllCustomersResponse(int recordsQuantity, List<GetAllCustomersDetailsResponse> customers)
        {
            RecordsQuantity = recordsQuantity;
            Customers = customers;
        }
    }

    public class GetAllCustomersDetailsResponse
    {
        public Guid Id { get; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Phone { get; private set; }
        public string Cpf { get; private set; }
        public bool IsActive { get; private set; }

        public GetAllCustomersDetailsResponse(Guid id, string name, string email, string phone, string cpf, bool isActive)
        {
            Id = id;
            Name = name;
            Email = email;
            Phone = phone;
            Cpf = cpf;
            IsActive = isActive;
        }
    }
}