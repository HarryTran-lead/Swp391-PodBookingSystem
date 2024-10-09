import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailBlog.css'; // Nhập CSS

export default function DetailBlog() {
  const { id } = useParams(); // Lấy id từ params
  const [blogPost, setBlogPost] = useState(null); // Trạng thái lưu bài viết

  useEffect(() => {
    fetchBlogPost();
  }, [id]); // Gọi lại khi id thay đổi

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`https://localhost:7257/api/Blogs/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBlogPost(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  return (
    <div className="detail-blog-container">
      {blogPost ? (
        <div>
          <h1>{blogPost.title}</h1>
          <img src={`https://localhost:7257/api/Blogs/${blogPost.id}/image`} alt={blogPost.title} />
          <p>{blogPost.shortDes}</p>
          <div>
            <h3>Main Description</h3>
            <p>{blogPost.mainDes}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Hiển thị loading trong khi lấy dữ liệu
      )}
    </div>
  );
}
