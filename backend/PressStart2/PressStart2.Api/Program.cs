using PressStart2.Api;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// builder.Services.AddRazorPages();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => 
    options.AddPolicy("Cors", builder =>
        {
            builder.
            AllowAnyOrigin().
            AllowAnyMethod().
            AllowAnyHeader();
        }));

// Extension Methods
builder.Services.ConfigureDbContext(builder.Configuration.GetConnectionString("PressStart2Connection"));
builder.Services.ConfigureRepository();
builder.Services.ConfigureMediator();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// app.UseStaticFiles();

// app.UseRouting();

app.UseAuthorization();

// app.MapRazorPages();
app.MapControllers();

app.Run();