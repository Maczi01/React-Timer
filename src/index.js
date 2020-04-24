import React from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid'

const Title = () => (
    <div className="title__container">
        <h1 className="title">simple timer</h1>
    </div>
)

function ProgressBar({percent = 20}) {
    return (
        <div className="ProgressBar">
            <div style={{width: `${percent}%`}}></div>
        </div>
    )
}

function Clock({minute = 0, second = 0, className = ""}) {
    return <h2 className={"Clock " + className}> Pozostało {minute}:{second}</h2>
}

function PauseCounter({pausesCount = 0}) {
    return <h2> "Liczba przerw: " {pausesCount}</h2>
}

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: false,
            isRunning: false,
            pausesCount: 0,
            elapsedTime: 0,
        };
        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.stopCounting = this.stopCounting.bind(this);
        this.startCounting = this.startCounting.bind(this);
    }

    handleStart() {
        this.setState({
            isRunning: true
        })
        this.startCounting();
    }

    startCounting() {
        this.interval = window.setInterval((() => {
            this.setState(
                (prevState) =>
                    ({elapsedTime: prevState.elapsedTime + 1}))
        }), 1000)
    }

    stopCounting() {
        window.clearInterval(this.interval)
    }

    handlePause() {
        this.setState(
            function (prevState) {
                const isPaused = !prevState.isPaused;
                isPaused ? this.stopCounting() : this.startCounting();
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount

                }
            }
        )
    }

    handleStop() {
        this.setState({
                isRunning: false,
                isPaused: false,
                elapsedTime: 0,
                pausesCount: 0,
            }
        )
        this.stopCounting()
    }

    render() {
        const {isRunning, isPaused, elapsedTime, pausesCount} = this.state;
        const {title, totalTimeInMinutes, onEdit, isEditable} = this.props;
        let playVisible = "button__play"
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeToLeftInSeconds = totalTimeInSeconds - elapsedTime;
        const minutesLeft = Math.floor(timeToLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeToLeftInSeconds % 60);
        const progress = (timeToLeftInSeconds / totalTimeInSeconds) * 100;
        if (timeToLeftInSeconds === 0) this.stopCounting();
        return (
            <>
                <div className={`timer__wrapper ${isEditable ? "inactive" : ""}`}>
                    <h2>{title}</h2>
                    <Clock minute={minutesLeft} second={secondsLeft}/>
                    <PauseCounter pausesCount={pausesCount}/>
                    <button onClick={this.handleStart} disabled={isRunning} className="button__play"/>
                    <button onClick={this.handlePause} className="button__pause"/>
                    <button onClick={this.handleStop} disabled={!isRunning} className="button__stop"/>
                    <button onClick={onEdit} disabled={isEditable} className="edit__stop"/>
                </div>
                <ProgressBar percent={progress}/>
            </>
        )
    }
}

const TimeBoxEditor = (props) => {
    const {
        title,
        totalTimeInMinutes,
        isEditable,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onConfirm,
    } = props;

    return (
        <div className={`TimeboxEditor ${isEditable ? "" : " inactive"}`}>
            <label>Co robisz?
                <input
                    value={title}
                    onChange={onTitleChange}
                    disabled={!isEditable}
                    type="text"/>
            </label><br/>
            <label>Ile minut?
                <input
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange}
                    disabled={!isEditable}
                    type="number"/>
            </label><br/>
            <button
                onClick={onConfirm}
                disabled={!isEditable}
            >Zatwierdź zmiany
            </button>
        </div>
    )
}

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągania stanu w górę",
        totalTimeInMinutes: 1,
        isEditable: true,
    }

    handleTitleChange = (e) => {
        this.setState(
            {title: e.target.value}
        )
    }

    handleTotalTimeInMinutesChange = (e) => {
        this.setState(
            {totalTimeInMinutes: e.target.value}
        )
    }
    handleConfirm = () => {
        this.setState(
            {isEditable: false}
        )
    }
    handleEdit = () => {
        this.setState(
            {isEditable: true}
        )
    }

    render() {
        const {title, totalTimeInMinutes, isEditable} = this.state
        return (
            <>
                <Title/>
                <TimeBoxEditor
                    isEditable={isEditable}
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onConfirm={this.handleConfirm}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox
                    title={title}
                    isEditable={isEditable}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onEdit={this.handleEdit}
                />
            </>
        )
    }
}

class TimeBoxCreator extends React.Component {
    state = {
        title: "",
        totalTimeInMinutes: ""
    }
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    handleTotalTimeInMinutesChange = (e) => {
        this.setState({totalTimeInMinutes: e.target.value})
    }
    handleSubmit = (e) => {
        e.preDefault();
        this.props.onCreate({
            id: uuid.v4(),
            title: this.state.title,
            totalTimeInMinutes: this.state.totalTimeInMinutes
        });
        // this.state.title = ""
        // this.state.totalTimeInMinutes = ""
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <label>Co robisz?
                    <input
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        type="text"/>
                </label><br/>
                <label>Ile minut?
                    <input
                        value={this.state.totalTimeInMinutes}
                        onChange={this.handleTotalTimeInMinutesChange}
                        type="number"/>
                </label><br/>
                <button>Dodaj timeboxa
                </button>
            </form>
        )
    }
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            {
                id: "dxgcbhjk",
                title: "Gra na cssach",
                totalTimeInMinutes: "10",
            }, {
                id: "dxgcbhsadasdasjk",
                title: "Nauka komponentów",
                totalTimeInMinutes: "40",
            }, {
                id: "dxgffffffcbhjk",
                title: "Wstawianie średników na końcu",
                totalTimeInMinutes: "20",
            },
        ]
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = this.state.timeboxes.filter((timebox, index) =>
                index !== indexToRemove)
            return {timeboxes}
        })
    };

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return {timeboxes};
        })
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return {timeboxes};
        })
    };

    render() {
        return (
            <>
                <TimeBoxCreator
                    onCreate={this.handleCreate}
                />
                {this.state.timeboxes.map((timebox, index) =>
                    <Timebox key={timebox.id}
                             timebox={timebox}
                             index={index}
                             title={timebox.title}
                             totalTimeInMinutes={timebox.totalTimeInMinutes}
                             onDelete={() => this.removeTimebox(index)}
                             onEdit={this.updateTimebox}
                    />
                )}
            </>
        )
    }
}

class Timebox extends React.Component {
    state = {
        title: this.props.title,
        totalTimeInMinutes: this.props.totalTimeInMinutes,
        isEditing: false,
    }
    changeEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleSubmit = (e) => {
        e.preDefault();
        this.props.onEdit(this.props.index, {
            ...this.props.timebox,
            title: this.state.title,
            totalTimeInMinutes: this.state.totalTimeInMinutes
        });
        this.setState({title: "", totalTimeInMinutes: ""})
        this.changeEdit()
    }
    handleTitleChange = e => {
        this.setState({title: e.target.value});
    };
    handleTotalTimeInMinutesChange = e => {
        this.setState({totalTimeInMinutes: e.target.value});
    };

    render() {
        const {title, totalTimeInMinutes, onDelete} = this.props;
        const {isEditing} = this.state;
        return (
            <div className="Timebox">
                {isEditing ?
                    <RenderEditForm
                        handleSubmit={this.handleSubmit}
                        handleTitleChange={this.handleTitleChange}
                        handleTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                        title={this.state.title}
                        totalTimeInMinutes={this.state.totalTimeInMinutes}
                    />
                    :
                    <RenderTitleAndTime title={title} totalTimeInMinutes={totalTimeInMinutes}/>
                }
                <button onClick={onDelete}>Usun</button>
                {isEditing ?
                    <button onClick={this.changeEdit}>Anuluj</button> :
                    <button onClick={this.changeEdit}>Edytuj</button>
                }
            </div>
        )
    }
}

const RenderTitleAndTime = ({title, totalTimeInMinutes}) => (
    <div>
        <h3>{title} - {totalTimeInMinutes} min</h3>
    </div>
)

const RenderEditForm = ({handleSubmit, handleTitleChange, handleTotalTimeInMinutesChange, title, totalTimeInMinutes}) => (
    <form onSubmit={handleSubmit}>
        <label>
            <input
                value={title}
                onChange={handleTitleChange}
                type="text"
            />
        </label>
        <label>
            <input
                value={totalTimeInMinutes}
                onChange={handleTotalTimeInMinutesChange}
                type="number"/>
        </label>
        <button>Zapisz</button>
    </form>
)

const App = () => (
    <>
        <TimeboxList/>
        <EditableTimebox/>
    </>
);

ReactDOM.render(<App/>, document.getElementById("root"));
