import "./ActionButton.css"; // Import the CSS file

// Define types for the props
interface ActionButtonProps {
  title: string;
  description: string;
  btnName: String;
  icon: string; // icon can be any valid JSX element, like an <svg> or <img>
  onClick: () => void; // onClick is a function that takes no arguments and returns nothing
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, description, icon, onClick, btnName }) => {
  return (
    <div className="action-button" onClick={onClick}>
      <div className="action-icon">
        <img src={icon} alt="" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="action-btn">{btnName}</button>
    </div>
  );
};

export default ActionButton;
