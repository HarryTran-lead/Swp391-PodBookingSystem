using SWP.Model;
using System.ComponentModel.DataAnnotations;

namespace SWP.Dto.Fercility
{
    public class PodModelDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int capacity { get; set; }
        public List<Pod> Pods { get; set; } = new List<Pod>();

    }
}
