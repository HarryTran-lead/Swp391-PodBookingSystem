using SWP.Model;

namespace SWP.Dto.Fercility
{
    public class RequestPodDto
    {
        public string Name { get; set; }
        public string Img { get; set; } = null;

        public int? LocId { get; set; }
        public int? ModelId { get; set; }
        public double PricePerHour { get; set; }
        public string Description { get; set; } = string.Empty;
        public PodModel? PodModel { get; set; }
        public Location? Location { get; set; }
    }
}
