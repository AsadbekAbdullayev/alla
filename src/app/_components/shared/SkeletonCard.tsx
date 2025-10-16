import React, { memo } from "react";
import { Skeleton, Card } from "antd";

const CardSkeletons = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card
          key={i}
          style={{
            width: 273,
            height: 272,
            borderRadius: "24px 64px 24px 24px",
            background: "#252527",
            boxShadow:
              "3px 5px 0 0 rgba(7, 8, 13, 0.15), 0 -4px 0 0 rgba(255, 106, 0, 0.13) inset",
          }}
          cover={
            <Skeleton.Image
              active
              style={{
                width: "100%",
                height: 150,
                borderRadius: "16px",
              }}
            />
          }
        >
          <Skeleton
            active
            paragraph={{ rows: 2 }}
            title={{ width: "70%" }}
            style={{ marginTop: 12 }}
          />
        </Card>
      ))}
    </div>
  );
};

export default memo(CardSkeletons);
