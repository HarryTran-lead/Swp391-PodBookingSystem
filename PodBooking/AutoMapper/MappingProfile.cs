using AutoMapper;
using PodBooking.DTO;
using PodBooking.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace PodBooking.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Account, AccountDTO>().ReverseMap();

            CreateMap<Account, AccountDTOClient>().ReverseMap();
        }
    }
}
