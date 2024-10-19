using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class UserPurchasedPackage
{
    public int UserPackageId { get; set; }

    public int? AccountId { get; set; }

    public int? PackageId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public int? RemainingUsage { get; set; }

    public bool? Status { get; set; }

    public string? TransactionReference { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ServicePackage? Package { get; set; }
}
