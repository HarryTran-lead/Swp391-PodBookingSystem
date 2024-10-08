using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PodBooking.Models;

public partial class PodBookingContext : DbContext
{
    public PodBookingContext()
    {
    }

    public PodBookingContext(DbContextOptions<PodBookingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<FoodMenu> FoodMenus { get; set; }

    public virtual DbSet<FoodOrder> FoodOrders { get; set; }

    public virtual DbSet<FoodOrderDetail> FoodOrderDetails { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<NotificationType> NotificationTypes { get; set; }

    public virtual DbSet<PayMethod> PayMethods { get; set; }

    public virtual DbSet<Pod> Pods { get; set; }

    public virtual DbSet<PodModel> PodModels { get; set; }

    public virtual DbSet<ServicePackage> ServicePackages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=PodBooking;User ID=sa;Password=123;Trust Server Certificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3213E83FE4B1CD10");

            entity.ToTable("Account");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LocationId).HasColumnName("LocationID");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Location).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.LocationId)
                .HasConstraintName("FK__Account__Locatio__3F466844");
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Blog__3213E83F6FA5CEB1");

            entity.ToTable("Blog");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AdminId).HasColumnName("adminId");
            entity.Property(e => e.MainDes)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ShortDes)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Booking__73951ACD7C686249");

            entity.ToTable("Booking");

            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.NotificationId).HasColumnName("NotificationID");
            entity.Property(e => e.PackageId).HasColumnName("PackageID");
            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.PodId).HasColumnName("PodID");
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.Total).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Account).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Booking__Account__44FF419A");

            entity.HasOne(d => d.Package).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Booking__Package__46E78A0C");

            entity.HasOne(d => d.Pod).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.PodId)
                .HasConstraintName("FK__Booking__PodID__45F365D3");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => new { e.BookingId, e.AccountId }).HasName("PK__Cart__00DCC0958E424F34");

            entity.ToTable("Cart");

            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Account).WithMany(p => p.Carts)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cart__AccountID__5441852A");

            entity.HasOne(d => d.Booking).WithMany(p => p.Carts)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cart__BookingID__534D60F1");
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => new { e.BookingId, e.FoodId }).HasName("PK__CartItem__DBC3C1F10A287F9E");

            entity.ToTable("CartItem");

            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.FoodId).HasColumnName("FoodID");

            entity.HasOne(d => d.Booking).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CartItem__Bookin__59063A47");

            entity.HasOne(d => d.Food).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.FoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CartItem__FoodID__59FA5E80");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3213E83F18CBCD13");

            entity.ToTable("Feedback");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.Comments).HasColumnType("text");

            entity.HasOne(d => d.Account).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Feedback__Accoun__68487DD7");

            entity.HasOne(d => d.Booking).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__Feedback__Bookin__693CA210");
        });

        modelBuilder.Entity<FoodMenu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FoodMenu__3213E83FC9758F50");

            entity.ToTable("FoodMenu");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PricePerUnit).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<FoodOrder>(entity =>
        {
            entity.HasKey(e => new { e.BookingId, e.AccountId }).HasName("PK__FoodOrde__00DCC09560967EC5");

            entity.ToTable("FoodOrder");

            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.Total).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Account).WithMany(p => p.FoodOrders)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FoodOrder__Accou__60A75C0F");

            entity.HasOne(d => d.Booking).WithMany(p => p.FoodOrders)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FoodOrder__Booki__5FB337D6");

            entity.HasOne(d => d.PayMethod).WithMany(p => p.FoodOrders)
                .HasForeignKey(d => d.PayMethodId)
                .HasConstraintName("FK__FoodOrder__PayMe__619B8048");
        });

        modelBuilder.Entity<FoodOrderDetail>(entity =>
        {
            entity.HasKey(e => new { e.FoodId, e.BookingId, e.AccountId }).HasName("PK__FoodOrde__C5607FC2FE2733D2");

            entity.ToTable("FoodOrderDetail");

            entity.Property(e => e.FoodId).HasColumnName("FoodID");
            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.Total).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Food).WithMany(p => p.FoodOrderDetails)
                .HasForeignKey(d => d.FoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FoodOrder__FoodI__6477ECF3");

            entity.HasOne(d => d.FoodOrder).WithMany(p => p.FoodOrderDetails)
                .HasForeignKey(d => new { d.BookingId, d.AccountId })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FoodOrderDetail__656C112C");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("PK__Location__E7FEA4773ECDFDFE");

            entity.ToTable("Location");

            entity.Property(e => e.LocationId).HasColumnName("LocationID");
            entity.Property(e => e.District)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Province)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Village)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E32A6D68775");

            entity.ToTable("Notification");

            entity.Property(e => e.NotificationId).HasColumnName("NotificationID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.BookingId).HasColumnName("BookingID");
            entity.Property(e => e.Message).HasColumnType("text");
            entity.Property(e => e.ReadStatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.SentTime).HasColumnType("datetime");

            entity.HasOne(d => d.Account).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Notificat__Accou__4CA06362");

            entity.HasOne(d => d.Booking).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__Notificat__Booki__4D94879B");

            entity.HasOne(d => d.NotificationTypeNavigation).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.NotificationType)
                .HasConstraintName("FK__Notificat__Notif__4E88ABD4");
        });

        modelBuilder.Entity<NotificationType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3213E83F1CA096FD");

            entity.ToTable("NotificationType");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Account).WithMany(p => p.NotificationTypes)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Notificat__Accou__49C3F6B7");
        });

        modelBuilder.Entity<PayMethod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PayMetho__3213E83FA4F811C0");

            entity.ToTable("PayMethod");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pod>(entity =>
        {
            entity.HasKey(e => e.PodId).HasName("PK__Pod__69F90ADE66D4723B");

            entity.ToTable("Pod");

            entity.Property(e => e.PodId).HasColumnName("PodID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.LocationId).HasColumnName("LocationID");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PodModelId).HasColumnName("PodModelID");
            entity.Property(e => e.PricePerHour).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Location).WithMany(p => p.Pods)
                .HasForeignKey(d => d.LocationId)
                .HasConstraintName("FK__Pod__LocationID__3A81B327");

            entity.HasOne(d => d.PodModel).WithMany(p => p.Pods)
                .HasForeignKey(d => d.PodModelId)
                .HasConstraintName("FK__Pod__PodModelID__3B75D760");
        });

        modelBuilder.Entity<PodModel>(entity =>
        {
            entity.HasKey(e => e.PodModelId).HasName("PK__PodModel__3D68294514C99A73");

            entity.ToTable("PodModel");

            entity.Property(e => e.PodModelId).HasColumnName("PodModelID");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ServicePackage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceP__3213E83FE225F520");

            entity.ToTable("ServicePackage");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Features).HasColumnType("text");
            entity.Property(e => e.PackageName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
