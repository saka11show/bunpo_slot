type Props = {
  target: {
    verb: string;
    stem: string;
    type: string;
  };
};

export function TargetInfo({ target }: Props) {
  return (
    <section className="target-info">
      <div className="target-title center">
        <h1>活用表を完成させよ</h1>
      </div>

      <div className="target-basic-form">
        <div className="target-basic-form-title center">
          基本形
        </div>
        <div className="target-basic-form-value center">
          {target.verb}
        </div>
      </div>

      <div className="target-katsuyo-type">
        <div className="target-katsuyo-type-title center">
          活用の種類
        </div>
        <div className="target-katsuyo-type-value center">
          {target.type}
        </div>
      </div>
    </section>
  );
}
