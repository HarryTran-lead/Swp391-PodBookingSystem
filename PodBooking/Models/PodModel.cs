using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class PodModel
{
    public int PodModelId { get; set; }

    public string? Name { get; set; }

    public int? Capacity { get; set; }

    public virtual ICollection<Pod> Pods { get; set; } = new List<Pod>();
}
