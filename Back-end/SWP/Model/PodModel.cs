using System.ComponentModel.DataAnnotations;

namespace SWP.Model
{
    public class PodModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int capacity { get; set; }
        public List<Pod> Pods { get; set; } = new List<Pod>();
    }
}
