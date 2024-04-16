import { Link } from "react-router-dom";
import { Card, Typography } from 'antd';


function PostCard({ _id, title, content, thumbnailImageUrl }) {
  return (
    <Link to={`/posts/${_id}`}>
      <Card bordered={false}>
        <img style={{ width: 240, height: 260}}src={thumbnailImageUrl} />
        <Typography.Title level={3}>{title}</Typography.Title>
        
      </Card>    
    </Link>
  );
}

export default PostCard;
