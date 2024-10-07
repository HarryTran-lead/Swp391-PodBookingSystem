using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Pod
{
    public int PodId { get; set; }

    public string? Name { get; set; }

    public int? LocationId { get; set; }

    public int? PodModelId { get; set; }

    public byte[]? ImgPod { get; set; }

    public decimal? PricePerHour { get; set; }

    public string? Description { get; set; }

    public virtual Location? Location { get; set; }

    public virtual PodModel? PodModel { get; set; }
}
