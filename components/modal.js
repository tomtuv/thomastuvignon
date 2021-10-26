import Close from "./close";

export default function Modal({ modal, handleClick, videoEl, videoUrl }) {
  return (
    <div
      id="modal"
      className="modal"
      aria-modal={modal}
      tabIndex={-1}
      role={modal ? "dialog" : null}
    >
      <button className="modal-button" onClick={handleClick}>
        <Close />
      </button>
      <div className="grid">
        <div className="modal-video">
          <video
            width={1920}
            height={1080}
            controls
            playsInline
            preload="none"
            poster="/og-image.jpg"
            ref={videoEl}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        className="modal-backdrop"
        onClick={handleClick}
        aria-hidden="true"
      />
    </div>
  );
}
