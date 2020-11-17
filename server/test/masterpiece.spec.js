const { MasterPiece } = require('../src/masterpiece')

describe('The MasterPiece class', () => {
    describe('newSet methode', () => {
        const masterPiece = new MasterPiece
        const pieceTab = masterPiece.pieces
        const masterPiece2 = new MasterPiece
        const pieceTab2 = masterPiece2.pieces
        test('return value length == 7', () => {
            console.log(masterPiece, pieceTab)
            expect(pieceTab.length).toEqual(7)
        })
        test('RED is in tab', () => {
            expect(pieceTab.indexOf('RED')).not.toEqual(-1)
        })
        test('BLUE is in tab', () => {
            expect(pieceTab.indexOf('BLUE')).not.toEqual(-1)
        })
        test('TURQUOISE is in tab', () => {
            expect(pieceTab.indexOf('TURQUOISE')).not.toEqual(-1)
        })
        test('ORANGE is in tab', () => {
            expect(pieceTab.indexOf('ORANGE')).not.toEqual(-1)
        })
        test('GREEN is in tab', () => {
            expect(pieceTab.indexOf('GREEN')).not.toEqual(-1)
        })
        test('PURPLE is in tab', () => {
            expect(pieceTab.indexOf('PURPLE')).not.toEqual(-1)
        })
        test('YELLOW is in tab', () => {
            expect(pieceTab.indexOf('YELLOW')).not.toEqual(-1)
        })
        test('return value length == 7', () => {
            expect(pieceTab2.length).toStrictEqual(7)
        })
        test('RED is in tab2', () => {
            expect(pieceTab2.indexOf('RED')).not.toEqual(-1)
        })
        test('BLUE is in tab2', () => {
            expect(pieceTab2.indexOf('BLUE')).not.toEqual(-1)
        })
        test('TURQUOISE is in tab2', () => {
            expect(pieceTab2.indexOf('TURQUOISE')).not.toEqual(-1)
        })
        test('ORANGE is in tab2', () => {
            expect(pieceTab2.indexOf('ORANGE')).not.toEqual(-1)
        })
        test('GREEN is in tab2', () => {
            expect(pieceTab2.indexOf('GREEN')).not.toEqual(-1)
        })
        test('PURPLE is in tab2', () => {
            expect(pieceTab2.indexOf('PURPLE')).not.toEqual(-1)
        })
        test('YELLOW is in tab2', () => {
            expect(pieceTab2.indexOf('YELLOW')).not.toEqual(-1)
        })
        test('set 1 and set 2 is not equal', () => {
            expect(pieceTab).not.toEqual(pieceTab2)
        })
    })
    describe('nextPiece methode', () => {
        const masterPiece = new MasterPiece
        masterPiece.pieces = ['RED', 'BLUE', 'TURQUOISE', 'ORANGE', 'GREEN', 'PURPLE', 'YELLOW']
        test('piece 0', () => {
            expect(masterPiece.nextPiece(0)).toEqual('RED')
        })
        test('piece 1', () => {
            expect(masterPiece.nextPiece(1)).toEqual('BLUE')
        })
        test('piece 2', () => {
            expect(masterPiece.nextPiece(2)).toEqual('TURQUOISE')
        })
        test('piece 3', () => {
            expect(masterPiece.nextPiece(3)).toEqual('ORANGE')
        })
        test('piece 4', () => {
            expect(masterPiece.nextPiece(4)).toEqual('GREEN')
        })
        test('piece 5', () => {
            expect(masterPiece.nextPiece(5)).toEqual('PURPLE')
        })
        test('piece 6', () => {
            expect(masterPiece.nextPiece(6)).toEqual('YELLOW')
        })
        test('piece 7', () => {
            expect(masterPiece.nextPiece(6)).not.toEqual(undefined)
        })
    })
})