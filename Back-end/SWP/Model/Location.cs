using System.ComponentModel.DataAnnotations;

namespace SWP.Model
{
    public class Location
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; } =string.Empty;
        // navigate 
        public List<Pod> Pods { get; set; } = new List<Pod>();
    }
}
