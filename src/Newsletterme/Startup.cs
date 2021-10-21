using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newsletterme.Infrastructure.Behaviors;
using Newsletterme.Infrastructure.Data;
using Newsletterme.Infrastructure.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Newsletterme
{
    public partial class Startup
    {
        private readonly IConfiguration _configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.Filters
                    .Add(typeof(ValidatorActionFilter));
            })
                .AddFeatureFolders()
                .AddFluentValidation(options =>
                    options.RegisterValidatorsFromAssembly(typeof(Program).Assembly));

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_configuration["ef:connectionString"]));

            services
                .AddMediatR(typeof(Startup))
                .AddTransient(
                    typeof(IPipelineBehavior<,>), 
                    typeof(LoggingBehavior<,>)
                );
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
