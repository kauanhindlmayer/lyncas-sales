using MediatR;
using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;
using PressStart2.Infra.Data.Repositories;

namespace PressStart2.Api
{
    public static class Setup
    {
        // IoC
        public static void ConfigureDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<PressStart2Context>(options =>
            {
                options.UseSqlServer(connectionString);
            });
        }

        public static void ConfigureRepository(this IServiceCollection services)
        {
            services.AddTransient<IRepositoryCustomer, RepositoryCustomer>();
            services.AddTransient<IRepositorySale, RepositorySale>();
        }

        public static void ConfigureMediator(this IServiceCollection services)
        {
            var assemblyDomain = AppDomain.CurrentDomain.Load("PressStart2.Domain");
            services.AddMediatR(assemblyDomain);
        }
    }
}
