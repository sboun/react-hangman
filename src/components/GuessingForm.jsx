export default function GuessingForm({guess,handleChange,handleSubmit}){
    return(
        <div id="guessForm">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={guess} maxLength="1" pattern="[a-z]" placeholder="Enter a lowercase letter"></input>
          <input type="submit" className="pushable-button"></input>
        </form>
      </div>
    )
}