from flask import Flask, request, jsonify, send_file
import pandas as pd
app = Flask(__name__)

@app.route("/")
def test():
    return 'Connection Successful'

@app.route("/create", methods=['POST'])
def create_table():
    cols = ['positionDate', 'portfolio', 'instrumentType', 'ISIN', 'ticker', 'contractCode', 'coupon', 'maturityDate', 'currency', 'currentFace', 'originalFace', 'price', 'marketValue']
    cols_rename = {'positionDate': 'Position Date', 'portfolio': 'Portfolio', 'instrumentType': 'Instrument Type', 'ticker': 'Ticker', 'contractCode': 'Contract Code', 'coupon': 'Coupon', 'maturityDate': 'Maturity', 'currency': 'Currency', 'currentFace': 'Current Face', 'originalFace': 'Original Face', 'price': 'Price', 'marketValue': 'Market Value'}
    if request.is_json:
        r = request.get_json(force=True)
        test = pd.DataFrame(r)
        new = test[cols]
        new.rename(columns=cols_rename, inplace=True)

        new = new.round(decimals=2)
        new['Coupon'] = new['Coupon'].apply(lambda x: '' if x == 0.0 else x)
        new['Position Date'] = pd.to_datetime(new['Position Date'], format='%Y%m%d').dt.date
        new['Maturity'] = pd.to_datetime(new['Maturity'], format='%m/%d/%Y').dt.date
        writer = pd.ExcelWriter('output.xlsx',
                        engine='xlsxwriter',
                        date_format='yyyymmdd')
        new.to_excel(writer, sheet_name='Holdings', index=False)
        workbook  = writer.book
        worksheet = writer.sheets['Holdings']
        (max_row, max_col) = new.shape
        worksheet.set_column(0, max_col, 20)
        writer.save()

        send_file("output.xlsx", as_attachment=True)
        return jsonify({"code": 200, "message": "Table created."}), 200
    else:
        return jsonify({"code": 400, "message": "Something went wrong."}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)