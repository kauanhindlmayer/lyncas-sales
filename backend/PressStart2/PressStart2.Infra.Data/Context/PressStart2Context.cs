using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Infra.Data.Configurations;
using prmToolkit.NotificationPattern;

namespace PressStart2.Infra.Data.Context
{
    public class PressStart2Context : DbContext
    {
        public PressStart2Context(DbContextOptions<PressStart2Context> options) : base(options) { }
        public DbSet<Customer> CustomerDbSet { get; set; }
        public DbSet<Sale> SaleDbSet { get; set; }
        public DbSet<SaleItem> SaleItemDbSet { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<Notification>();

            //modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            //modelBuilder.ApplyConfiguration(new SaleConfiguration());
            //modelBuilder.ApplyConfiguration(new SaleItemConfiguration());

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PressStart2Context).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
