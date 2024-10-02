namespace PodBooking.Config
{
    public class Enums
    {
        public class Pagination
        {
            public static int pageSizeDefault = 20; 
        }

        public class Account
        {
            public static string Inactive = "Inactive";
            public static string Active = "Active";

            public static Dictionary<string, string> Status = new Dictionary<string, string> 
            {
                { Active, "Hoạt động" },
                { Inactive, "Ngưng hoạt động"}
            };

            private static string Male = "M";
            private static string Female = "F";

            public static Dictionary<string, string> Genders = new Dictionary<string, string>
            {
                { Male, "Nam" },
                { Female, "Nữ"}
            };
        }

        public class Roles
        {
            public static string Customer = "Customer";
            public static string Admin = "Admin";
        }


        public class Errors
        {
            public static string SignInUnsuccessfull = "Đăng nhập thất bại";
            public static string SignUpUnsuccessfull = "Đăng kí thất bại";
            public static string UsernameExisted = "Username đã tồn tại";
            public static string WrongUserNameOrPass = "Sai username hoặc mật khẩu";
        }


        public class Successes
        {
            public static string SignInsuccessfull = "Đăng nhập thành công";
            public static string SignUpsuccessfull = "Đăng kí thành công";
        }
    }
}
