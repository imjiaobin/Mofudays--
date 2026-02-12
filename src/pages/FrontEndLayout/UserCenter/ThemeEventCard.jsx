export default function ThemeEventCard({ img, alt, title, date, desc, footnote, href }) {
  return (
    <div className="col">
      <div className="card h-100 theme-event-card p-2 fade-up">
        <img src={img} className="card-img-top mb-6 theme-event-card img-hover-bigger" alt={alt} />

        <div className="card-body">
          <h6 className="card-title h6 fw-700 mb-4">{title}</h6>
          <p className="card-text p3 fw-700 mb-2">{date}</p>

          {String(desc)
            .split("\n")
            .map((line, idx) => (
              <p key={idx} className={`card-text p4 ${idx === 0 ? "mb-1" : ""}`}>
                {line}
              </p>
            ))}

          {footnote ? <small className="fw-700">{footnote}</small> : null}
        </div>

        {/* 目前先阻止跳頁，之後接 Router 再換成 <Link> */}
        <a className="text-center" href={href} onClick={(e) => e.preventDefault()}>
          <button className="btn b2 btn-primary rounded-pill btn-reserve" type="button">
            查看詳情
          </button>
        </a>
      </div>
    </div>
  );
}