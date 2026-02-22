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
        <h1 className="target-title-text">活用表を完成させよ!</h1>
      </div>

      <div className="target-basic-form">
        <div className="target-basic-form-title center">
          <h2>基本形</h2>
        </div>
        <div className="target-basic-form-value center">
          <h1>{target.verb}</h1>
        </div>
      </div>

      <div className="target-katsuyo-type">
        <div className="target-katsuyo-type-title center">
          <h2>活用の種類</h2>
        </div>
        <div className="target-katsuyo-type-value center">
          <h1>{target.type}</h1>
        </div>
      </div>
    </section>
  );
}