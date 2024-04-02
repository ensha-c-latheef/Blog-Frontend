import { Link } from "react-router-dom";
import { Card, Typography } from 'antd';


function PostCard({ _id, title, content }) {
  return (
    <Link to={`/posts/${_id}`}>
      <Card bordered={false}>
        {/* <img style={{ width: 240, height: 260}}src={imageUrl} /> */}
        <Typography.Title level={3}>{title}</Typography.Title>
        <Typography.Title level={5}>{content}</Typography.Title>
      </Card>    
    </Link>
  );
}

export default PostCard;
