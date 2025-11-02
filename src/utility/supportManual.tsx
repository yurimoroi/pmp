export const admin = () => {
  return (
    <>
      <div className="space-y-4 text-gray-700">
        <h3 className="text-xl font-bold text-gray-800 mb-4">使い方ガイド</h3>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">基本操作</h4>
          <p className="text-sm leading-relaxed">このアプリケーションでは、園児の登録、出欠管理、健康チェックなどの機能を利用できます。 各画面の操作方法について詳しく説明します。</p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">園児登録</h4>
          <p className="text-sm leading-relaxed">園児登録画面では、新しい園児の情報を入力して登録できます。 園児番号、名前、クラス、入園日などの情報を入力してください。</p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">出欠管理</h4>
          <p className="text-sm leading-relaxed">出欠管理画面では、園児の出席状況を記録できます。 欠席理由や体調不良の有無なども記録できます。</p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">健康チェック</h4>
          <p className="text-sm leading-relaxed">健康チェック画面では、園児の体調や健康状態を記録できます。 体温や体調不良の症状などを記録してください。</p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">設定</h4>
          <p className="text-sm leading-relaxed">設定画面では、アプリケーションの表示設定や年次更新などの管理機能を利用できます。 園の管理者のみがアクセスできます。</p>
        </section>
      </div>
    </>
  );
};

export const childList = () => {
  return (
    <>
      <div className="space-y-4 text-gray-700">
        <h3 className="text-xl font-bold text-gray-800 mb-4">使い方ガイド</h3>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">検索方法</h4>
          <p className="text-sm leading-relaxed">
            クラスと日付を選択してください。
            <br />
            検索を押すと園児一覧が表示されます。
          </p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">出席簿の編集</h4>
          <p className="text-sm leading-relaxed">
            編集を行いたい園児の行を選択してください。
            <br />
            編集する項目を編集した後、保存を押すと編集内容がテーブルに反映されます。
            <br />
            編集後、保存を押すと編集内容が保存されます。
            <br />
            編集後に保存を押さずにページを離れると編集内容が破棄されます。
          </p>
        </section>
      </div>
    </>
  );
};

export const childRegister = () => {
  return (
    <>
      <div className="space-y-4 text-gray-700">
        <h3 className="text-xl font-bold text-gray-800 mb-4">使い方ガイド</h3>
      </div>

      <section className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">園児情参照除方法</h4>
        <p className="text-sm leading-relaxed">
          園児番号または名前とクラス名を入力してください。
          <br />
          検索を押すと園児情報が表示されます。
          <br />
          園児番号と名前、クラス名が入力されている場合、園児番号での検索が優先されます。
          <br />
          該当する園児が見つからない場合はエラーメッセージが表示されますので、検索条件を見直して、再度検索を押してください。
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">園児情報登録方法</h4>
        <p className="text-sm leading-relaxed">
          園児番号は空欄にしてください。
          <br />
          入力必須項目は名前、クラス、入園日です。
          <br />
          登録を押すと園児情報が登録されます。
        </p>
      </section>

      <section className="mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">園児情報更新方法</h4>
        <p className="text-sm leading-relaxed">
          園児番号を入力してください。
          <br />
          入力必須項目は名前、クラス、入園日です。
          <br />
          更新を押すと園児情報が更新されます。
        </p>
      </section>
    </>
  );
};

export const settings = () => {
  return (
    <>
      <div className="space-y-4 text-gray-700">
        <h3 className="text-xl font-bold text-gray-800 mb-4">使い方ガイド</h3>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">表示設定</h4>
          <p className="text-sm leading-relaxed">
            水遊びの表示とお薬の有無の表示を切り替えることができます。
            <br />
            保存を押すと設定が保存されます。
          </p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">卒園処理</h4>
          <p className="text-sm leading-relaxed">
            卒園処理を行うと、卒園対象の園児の情報が更新されます。
            <br />
            園長に確認の上、卒園処理を行ってください。
            <br />
            同年度に二度実行するとエラーが発生します。
          </p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">年次更新</h4>
          <p className="text-sm leading-relaxed">
            年次更新を行うと、次年度へクラスが進級されます。
            <br />
            園長に確認の上、年次更新を行ってください。
            <br />
            同年度に二度実行するとエラーが発生します。
            <br />
            卒園処理よりも前に実行はしないでください。
          </p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">ログアウト</h4>
          <p className="text-sm leading-relaxed">ログアウトを押すとログアウトされます。</p>
        </section>
      </div>
    </>
  );
};
