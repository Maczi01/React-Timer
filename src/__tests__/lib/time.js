import {getTimeInMinutesAndSeconds} from "../../lib/time";

describe("getTimeInMinutesAndSeconds", () =>{
    it("should return 0 minutes and 30 second for 30" , () => {
        expect(
            getTimeInMinutesAndSeconds(30)
        ).toEqual([0, 30] )
    })
    it("should return 3 minutes and 20 second for 200" , () => {
        expect(
            getTimeInMinutesAndSeconds(30)
        ).toEqual([3, 20] )
    })

})