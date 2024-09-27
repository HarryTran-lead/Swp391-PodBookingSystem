using System.ComponentModel.DataAnnotations;

namespace SWP.Dto.Account
{
    public class SignInAccountDto
    {
        [Required, EmailAddress]    
        public string Email { get; set; }=null;
        [Required]
        public string Password { get; set; }=null;
    
}
}
