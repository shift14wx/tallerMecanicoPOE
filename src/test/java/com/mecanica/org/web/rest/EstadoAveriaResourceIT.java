package com.mecanica.org.web.rest;

import com.mecanica.org.TallerMecanicoPoeApp;
import com.mecanica.org.domain.EstadoAveria;
import com.mecanica.org.repository.EstadoAveriaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EstadoAveriaResource} REST controller.
 */
@SpringBootTest(classes = TallerMecanicoPoeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EstadoAveriaResourceIT {

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private EstadoAveriaRepository estadoAveriaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoAveriaMockMvc;

    private EstadoAveria estadoAveria;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoAveria createEntity(EntityManager em) {
        EstadoAveria estadoAveria = new EstadoAveria()
            .estado(DEFAULT_ESTADO)
            .descripcion(DEFAULT_DESCRIPCION);
        return estadoAveria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoAveria createUpdatedEntity(EntityManager em) {
        EstadoAveria estadoAveria = new EstadoAveria()
            .estado(UPDATED_ESTADO)
            .descripcion(UPDATED_DESCRIPCION);
        return estadoAveria;
    }

    @BeforeEach
    public void initTest() {
        estadoAveria = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoAveria() throws Exception {
        int databaseSizeBeforeCreate = estadoAveriaRepository.findAll().size();
        // Create the EstadoAveria
        restEstadoAveriaMockMvc.perform(post("/api/estado-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadoAveria)))
            .andExpect(status().isCreated());

        // Validate the EstadoAveria in the database
        List<EstadoAveria> estadoAveriaList = estadoAveriaRepository.findAll();
        assertThat(estadoAveriaList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoAveria testEstadoAveria = estadoAveriaList.get(estadoAveriaList.size() - 1);
        assertThat(testEstadoAveria.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testEstadoAveria.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createEstadoAveriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoAveriaRepository.findAll().size();

        // Create the EstadoAveria with an existing ID
        estadoAveria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoAveriaMockMvc.perform(post("/api/estado-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadoAveria)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoAveria in the database
        List<EstadoAveria> estadoAveriaList = estadoAveriaRepository.findAll();
        assertThat(estadoAveriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstadoAverias() throws Exception {
        // Initialize the database
        estadoAveriaRepository.saveAndFlush(estadoAveria);

        // Get all the estadoAveriaList
        restEstadoAveriaMockMvc.perform(get("/api/estado-averias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoAveria.getId().intValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getEstadoAveria() throws Exception {
        // Initialize the database
        estadoAveriaRepository.saveAndFlush(estadoAveria);

        // Get the estadoAveria
        restEstadoAveriaMockMvc.perform(get("/api/estado-averias/{id}", estadoAveria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoAveria.getId().intValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingEstadoAveria() throws Exception {
        // Get the estadoAveria
        restEstadoAveriaMockMvc.perform(get("/api/estado-averias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoAveria() throws Exception {
        // Initialize the database
        estadoAveriaRepository.saveAndFlush(estadoAveria);

        int databaseSizeBeforeUpdate = estadoAveriaRepository.findAll().size();

        // Update the estadoAveria
        EstadoAveria updatedEstadoAveria = estadoAveriaRepository.findById(estadoAveria.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoAveria are not directly saved in db
        em.detach(updatedEstadoAveria);
        updatedEstadoAveria
            .estado(UPDATED_ESTADO)
            .descripcion(UPDATED_DESCRIPCION);

        restEstadoAveriaMockMvc.perform(put("/api/estado-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoAveria)))
            .andExpect(status().isOk());

        // Validate the EstadoAveria in the database
        List<EstadoAveria> estadoAveriaList = estadoAveriaRepository.findAll();
        assertThat(estadoAveriaList).hasSize(databaseSizeBeforeUpdate);
        EstadoAveria testEstadoAveria = estadoAveriaList.get(estadoAveriaList.size() - 1);
        assertThat(testEstadoAveria.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testEstadoAveria.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoAveria() throws Exception {
        int databaseSizeBeforeUpdate = estadoAveriaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoAveriaMockMvc.perform(put("/api/estado-averias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadoAveria)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoAveria in the database
        List<EstadoAveria> estadoAveriaList = estadoAveriaRepository.findAll();
        assertThat(estadoAveriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoAveria() throws Exception {
        // Initialize the database
        estadoAveriaRepository.saveAndFlush(estadoAveria);

        int databaseSizeBeforeDelete = estadoAveriaRepository.findAll().size();

        // Delete the estadoAveria
        restEstadoAveriaMockMvc.perform(delete("/api/estado-averias/{id}", estadoAveria.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoAveria> estadoAveriaList = estadoAveriaRepository.findAll();
        assertThat(estadoAveriaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
