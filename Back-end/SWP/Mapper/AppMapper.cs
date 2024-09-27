using AutoMapper;
using SWP.Dto.Fercility;
using SWP.Model;

namespace SWP.Mapper
{
    public class AppMapper : Profile
    {
        public AppMapper()
        {
            CreateMap<Location, RequestLocationDto>().ReverseMap();
            CreateMap<PodModel, RequestPodModelDto>().ReverseMap();

        }
    }
}
