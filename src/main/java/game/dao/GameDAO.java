package game.dao;

import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import commons.DBConfig;
import game.dto.GameDTO;
import mypage.dto.GameScoreDTO;

public class GameDAO {
	public static GameDAO instance;

	public synchronized static GameDAO getInstance() {
		if (instance == null) {
			instance = new GameDAO();
		}
		return instance;
	}

	private GameDAO() {
	};

	public List<GameDTO> getList() throws Exception {
		String sql = "select * from game where service_code = 1";

		try (Connection con = DBConfig.getConnection();
			PreparedStatement ps = con.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();) {
			List<GameDTO> list = new ArrayList<>();
			while (rs.next()) {
				int seq = rs.getInt(1);
				String title = rs.getString(2);
				String discription = rs.getString(3);
				String contents = rs.getString(4);
				String thumbnail = rs.getString(5);
				int service_code = rs.getInt(6);
				list.add(new GameDTO(seq, title, discription, contents, thumbnail, service_code));
			}
			return list;
		}
	}

	public GameDTO getDetail(int id) throws Exception {
		String sql = "select * from game where seq = ?";

		try (Connection con = DBConfig.getConnection(); PreparedStatement ps = con.prepareStatement(sql);) {
			ps.setInt(1, id);
			try (ResultSet rs = ps.executeQuery()) {
				GameDTO dto = null;
				while (rs.next()) {
					int seq = rs.getInt(1);
					String title = rs.getString(2);
					String discription = rs.getString(3);
					String contents = rs.getString(4);
					String thumbnail = rs.getString(5);
					int service_code = rs.getInt(6);
					dto = new GameDTO(seq, title, discription, contents, thumbnail, service_code);
				}
				System.out.println(dto.getThumbnail());
				return dto;
			}
		}
	}

	/**
	 * 마이페이지 게임 플레이 정보 출력
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<GameScoreDTO> gameList(String id) throws Exception {

		String sql = "select g.title, coalesce(gs.score, 0) as score, gs.member_id, g.seq as game_seq, coalesce(g.thumbnail, 'default_thumbnail.png') as thumbnail " +
                "from game g left join game_score gs on g.seq = gs.game_seq and gs.member_id = ? where g.service_code = 1";


		try (Connection con = DBConfig.getConnection(); PreparedStatement pstat = con.prepareStatement(sql)) {

			pstat.setString(1, id);

			try (ResultSet rs = pstat.executeQuery()) {

				List<GameScoreDTO> list = new ArrayList<>();
				while (rs.next()) {
					String title = rs.getString("title");
					int score = rs.getInt("score");
					String member_id = rs.getString("member_id");
					int game_seq = rs.getInt("game_seq");
					String thumbnail = rs.getString("thumbnail");
					
					list.add(new GameScoreDTO(title, score, member_id, game_seq, thumbnail));
				}
				return list;
			}
		}

	}
	
	
	
	
	
	

}
